import { combineReducers } from 'redux';
import { default as customization } from './customization';
import { default as authentication } from './authentication';
import { default as users } from './users';
import { default as shifts } from './shifts';
import { default as organizations } from './organizations';
import { default as places } from './places';
import { default as explain } from './explain';
import { default as timesheet } from './timesheet';
import { default as notification } from './notification';
import { default as student } from './student';
import { default as teacher } from './teacher';
import { default as course } from './course';
import { default as classes } from './classes';
export * from './customization';
export * from './authentication';
export * from './users';
export * from './shifts';
export * from './organizations';
export * from './places';
export * from './explain';
export * from './timesheet';
export * from './notification';
export * from './student';
export * from './teacher';
export * from './course';
export * from './classes';
const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  shifts,
  organizations,
  places,
  explain,
  timesheet,
  notification,
  student,
  teacher,
  course,
  classes
});

export default rootReducer;
