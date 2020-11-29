import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const Student = React.lazy(()=> import('./Demo/Video/Student'));
const Home = React.lazy(()=>import('./Demo/Home/MainPage'));


const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/student', exact: true, name: 'Student', component: Student},
    { path : '/home', exact: true, name: 'Home', component: Home}
];

export default routes;