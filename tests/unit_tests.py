import unittest
import math

# --- Constants and Mappings ---

move_values = {
    "up": (0, 1),
    "down": (0, -1),
    "left": (-1, 0),
    "right": (1, 0)
}

direction_values = {
    "up": (0, 1),
    "down": (0, -1),
    "left": (-1, 0),
    "right": (1, 0)
}

# Helper to normalize directions if they come as objects
def member_to_tuple(val):
    if hasattr(val, 'value'):
        return val.value
    return val

# --- Core Functions ---

def rotate_point(p, center, angle_deg):
    """Rotate a point p around a center by angle_deg degrees."""
    angle_rad = math.radians(angle_deg)
    px, py = p
    cx, cy = center
    
    # Translate point back to origin
    temp_x = px - cx
    temp_y = py - cy
    
    # Rotate point
    rotated_x = temp_x * math.cos(angle_rad) - temp_y * math.sin(angle_rad)
    rotated_y = temp_x * math.sin(angle_rad) + temp_y * math.cos(angle_rad)
    
    # Translate point back
    return (rotated_x + cx, rotated_y + cy)

def dot(v1, v2):
    return v1[0] * v2[0] + v1[1] * v2[1]

def mag(v):
    return math.sqrt(v[0]**2 + v[1]**2)

def norm(v):
    m = mag(v)
    if m == 0: return (0, 0)
    return (v[0]/m, v[1]/m)

def get_bounds(polygon):
    min_x = min(p[0] for p in polygon)
    max_x = max(p[0] for p in polygon)
    min_y = min(p[1] for p in polygon)
    max_y = max(p[1] for p in polygon)
    return min_x, min_y, max_x, max_y

def point_in_polygon(point, polygon):
    x, y = point
    n = len(polygon)
    inside = False
    p1x, p1y = polygon[0]
    for i in range(n + 1):
        p2x, p2y = polygon[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside

# --- Classes ---

class MotionBase:
    def __init__(self, start_pos, start_dir, center, angle, turn_dir, end_pos):
        self.expected_start_position = start_pos
        self.expected_start_orientation = start_dir
        self.center = center
        self.angle = angle
        self.turn_direction = turn_dir
        self.expected_end_position = end_pos
        
        # Calculate expected end orientation
        # This is a simplified mock-up of the logic
        start_dir_tuple = member_to_tuple(start_dir)
        rad = math.radians(angle) if turn_dir == (0, 1) else math.radians(-angle)
        
        ex = start_dir_tuple[0] * math.cos(rad) - start_dir_tuple[1] * math.sin(rad)
        ey = start_dir_tuple[0] * math.sin(rad) + start_dir_tuple[1] * math.cos(rad)
        self.expected_end_orientation = (round(ex), round(ey))

class RobotBase:
    def __init__(self):
        self.pos = (0, 0)
        self.dir = direction_values["up"]
        self.input_buffer = []

    def step(self):
        if not self.input_buffer:
            return
        
        cmd = self.input_buffer.pop(0)
        curr_dir = member_to_tuple(self.dir)
        
        if cmd == "forward":
            self.pos = (self.pos[0] + curr_dir[0], self.pos[1] + curr_dir[1])
        elif cmd == "back":
            self.pos = (self.pos[0] - curr_dir[0], self.pos[1] - curr_dir[1])
        elif cmd == "left":
            # Rotate dir CCW 90
            self.dir = (-curr_dir[1], curr_dir[0])
        elif cmd == "right":
            # Rotate dir CW 90
            self.dir = (curr_dir[1], -curr_dir[0])

# --- Test Suite ---

class TestMotionBase(unittest.TestCase):
    def test_180_degree_turn(self):
        # "Left turn 180" from (0,0) to (-1,0) using (0,1) as center and turn direction left;
        motion_obj = MotionBase(
            (0, 0), direction_values["left"], (0, 1), 180, (0, 1), (-1, 0)
        )
        self.assertEqual(motion_obj.expected_start_position, (0, 0))
        self.assertEqual(motion_obj.expected_end_position, (-1, 0))
        self.assertEqual(member_to_tuple(motion_obj.expected_start_orientation), member_to_tuple(direction_values["left"]))
        # 180 degrees from Left (-1,0) CCW leads to Right (1,0)
        self.assertEqual(member_to_tuple(motion_obj.expected_end_orientation), member_to_tuple(direction_values["right"]))
        
    def test_90_degree_turn_left(self):
        # 90 degrees turn left
        # Start UP (0,1), CCW 90 deg -> Left (-1,0)
        motion_obj = MotionBase(
            (0, 0), direction_values["up"], (1, 0), 90, (0, 1), (1, 1)
        )
        self.assertEqual(motion_obj.expected_start_position, (0, 0))
        self.assertEqual(member_to_tuple(motion_obj.expected_start_orientation), member_to_tuple(direction_values["up"]))
        self.assertEqual(member_to_tuple(motion_obj.expected_end_orientation), member_to_tuple(direction_values["left"]))

class TestPointInPolygon(unittest.TestCase):
    def test_inside_square(self):
        poly = [(0, 0), (2, 0), (2, 2), (0, 2)]
        self.assertTrue(point_in_polygon((1, 1), poly))
        self.assertTrue(point_in_polygon((0.5, 0.5), poly))
        
    def test_outside_square(self):
        poly = [(0, 0), (2, 0), (2, 2), (0, 2)]
        self.assertFalse(point_in_polygon((3, 1), poly))
        self.assertFalse(point_in_polygon((-1, 1), poly))
        
    def test_on_edge_square(self):
        poly = [(0, 0), (2, 0), (2, 2), (0, 2)]
        self.assertTrue(point_in_polygon((0, 1), poly)) 

class TestGetBounds(unittest.TestCase):
    def test_basic_polygon(self):
        poly = [(0, 1), (5, -2), (2, 10), (-3, 4)]
        min_x, min_y, max_x, max_y = get_bounds(poly)
        self.assertEqual(min_x, -3)
        self.assertEqual(min_y, -2)
        self.assertEqual(max_x, 5)
        self.assertEqual(max_y, 10)

class TestVectorMath(unittest.TestCase):
    def test_rotate_point_90(self):
        res = rotate_point((1, 0), (0, 0), 90)
        self.assertAlmostEqual(res[0], 0)
        self.assertAlmostEqual(res[1], 1)
        
    def test_rotate_point_180(self):
        res = rotate_point((1, 0), (0, 0), 180)
        self.assertAlmostEqual(res[0], -1)
        self.assertAlmostEqual(res[1], 0)

    def test_dot_product(self):
        self.assertEqual(dot((1, 2), (3, 4)), 11)

    def test_magnitude(self):
        self.assertEqual(mag((3, 4)), 5)

    def test_normalize(self):
        n = norm((10, 0))
        self.assertEqual(n, (1, 0))

class TestRobotMovementSteps(unittest.TestCase):
    def setUp(self):
        self.robot = RobotBase()

    def test_step_forward(self):
        self.robot.input_buffer = ["forward"]
        self.robot.step()
        self.assertEqual(self.robot.pos, (0, 1))
        self.assertEqual(member_to_tuple(self.robot.dir), member_to_tuple(direction_values["up"]))

    def test_turn_left(self):
        self.robot.input_buffer = ["left"]
        self.robot.step()
        self.assertEqual(self.robot.pos, (0, 0))
        self.assertEqual(member_to_tuple(self.robot.dir), member_to_tuple(direction_values["left"]))

    def test_complex_route(self):
        self.robot.input_buffer = ["forward", "left", "forward", "right", "back"]
        for _ in range(5):
            self.robot.step()
        self.assertEqual(self.robot.pos, (-1, 0))
        self.assertEqual(member_to_tuple(self.robot.dir), member_to_tuple(direction_values["up"]))

if __name__ == '__main__':
    unittest.main()
