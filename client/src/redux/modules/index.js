import { combineReducers } from 'redux';
import users from './users';
import trainings from './trainings';
import jobs from './jobs';
import profiles from './profiles';
import alert from './alert';
import courses from './courses';

const rootReducer = combineReducers({
  users,
  trainings,
  jobs,
  profiles,
  alert,
  courses,
});

export default rootReducer;
