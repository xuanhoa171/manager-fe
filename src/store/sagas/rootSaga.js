import { all } from 'redux-saga/effects';
import watchAuthentication from './authentication';
import watchUsers from './users';
import watchShifts from './shifts';
import watchOrganizations from './organizations';
import watchPlaces from './places';
import watchExplains from './explain';
import watchTimesheet from './timesheet';
import watchNotification from './notification';
import watchStudent from './student';
import watchTeacher from './teacher';
import watchCourse from './course';
import watchClasses from './classes';
export default function* rootSaga() {
  yield all([
    watchAuthentication(),
    watchUsers(),
    watchShifts(),
    watchOrganizations(),
    watchPlaces(),
    watchExplains(),
    watchTimesheet(),
    watchNotification(),
    watchStudent(),
    watchTeacher(),
    watchCourse(),
    watchClasses()
  ]);
}
