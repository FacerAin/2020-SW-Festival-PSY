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
                    title: '학생 수업 화면',
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
                    id: 'Best',
                    title: '교수자 Report',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-file-text',
                }
            ]
        }
    ]
}