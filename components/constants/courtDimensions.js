// Badminton court dimensions (in meters)
// Reference: BWF (Badminton World Federation) official regulations

export const COURT_DIMENSIONS = {
  // Total court dimensions
  TOTAL_LENGTH: 13.4,  // meters
  TOTAL_WIDTH: 6.1,    // meters
  
  // Service court dimensions
  SERVICE_COURT_LENGTH: 3.86,  // meters
  SERVICE_COURT_WIDTH: 2.53,   // meters
  
  // Line positions
  SHORT_SERVICE_LINE: 1.98,    // meters from net
  LONG_SERVICE_LINE_DOUBLES: 5.84,  // meters from net
  LONG_SERVICE_LINE_SINGLES: 6.7,   // meters from net
  SIDELINE_SINGLES: 2.59,      // meters from center
  SIDELINE_DOUBLES: 3.05,      // meters from center
  
  // Line properties
  LINE_WIDTH: 0.04,            // meters (40mm standard)
  BORDER_OFFSET: 0.10,         // meters (10cm offset)
  
  // Net dimensions
  NET_HEIGHT: 1.55,            // meters at posts
  NET_CENTER_HEIGHT: 1.524,    // meters at center
  NET_MESH_HEIGHT: 0.76,       // meters
  NET_TAPE_WIDTH: 0.05,        // meters
  NET_TAPE_THICKNESS: 0.01,    // meters
  NET_POST_RADIUS: 0.02,       // meters
  NET_GRID_SIZE: 0.04,         // meters
  NET_LINE_THICKNESS: 0.005,   // meters
};

export const COURT_COLORS = {
  COURT_GREEN: '#228B22',
  LINE_WHITE: '#FFFFFF',
  WOOD_BORDER: '#DEB887',
  NET_BLACK: '#000000',
  NET_POST_YELLOW: '#FFFF00',
};

export const LIGHTING = {
  AMBIENT_INTENSITY: 0.7,
  DIRECTIONAL_INTENSITY: 0.8,
  DIRECTIONAL_POSITION: [5, 10, 5],
};

export const CAMERA_DEFAULTS = {
  POSITION: [-10, 8, 15],
  FOV: 45,
  MIN_DISTANCE: 5,
  MAX_DISTANCE: 50,
  ZOOM_SPEED: 0.5,
  PAN_SPEED: 0.5,
  ROTATE_SPEED: 0.5,
};
