export default {
    items: [
        {
            id: 'student',
            title: 'Student',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'studentVideo',
                    title: '학생수업화면',
                    type: 'item',
                    url: '/student',
                    icon: 'feather icon-file-text',
                }
            ]
        },
        {
            id: 'teacher',
            title: 'Reports',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'Worst',
                    title: '1st',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-file-text',
                },
                {
                    id: 'Best',
                    title: '2st',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-file-text',
                }
            ]
        }
    ]
}