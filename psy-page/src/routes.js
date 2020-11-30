import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const Student = React.lazy(()=> import('./Demo/Video/Student'))
const Streamcam = React.lazy(()=> import('./Demo/Video/Streamcam'))


const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/student', exact: true, name: 'Student', component: Student},
    { path: '/stream', exact: true, name: 'Streamcam', component: Streamcam }
];

export default routes;