var JAVABASE = "/java/"
var JVMBASE = "/jvm/"
var PRIMARY = JAVABASE + "primary/"
var ADVANCED = JAVABASE + "advanced/"
var JAVAIO = JAVABASE + "io/"
module.exports = {
    title: '编程学习',
    description: "Hello, World",
    head: [
        ['link', { rel: 'icon', href: '/assets/img/java.png' }],
    ],
    theme: 'reco',
    base: '/docs/',
    // 按中国习惯显示日期
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    // 主题配置
    themeConfig: {
        // 配置页面左上角的logo，/为.vuepress下的public文件夹
        // logo: '/assets/img/logo.png',
        nav: [
            {
                text: '首页', link: '/'
            },

            {
                text: 'Java',
                ariaLabel: 'Java Menu',
                // link: "/java/javase/"
                // 使用items而不是link可以变成一个下拉框
                // 以 / 结尾的路径将会被视为 */README.md
                items: [
                    { text: "基础", link: JAVABASE },
                    { text: "JVM", link: JVMBASE },
                ]
            },
            { text: '框架', link: '/frame/' },
            { text: '算法', link: '/algorithm/' },
            {
                text: '网络',
                link: '/network/Network-Protocol.html'
            },
        ],
        sidebar: {
            '/java/': [
                {
                    title: '基础',
                    path: PRIMARY + 'primary-datatype',
                    collapsable: false,
                    children: [
                        { title: '基本数据类型', path: PRIMARY + 'primary-datatype' },
                        { title: '字符串', path: PRIMARY + 'string' },
                        { title: '布尔值的问题', path: PRIMARY + 'bool' },
                        { title: '特殊关键字', path: PRIMARY + '特殊关键字' },
                        {
                            title: '枚举',
                            path: PRIMARY + 'enum',
                        },
                        {
                            title: '注解',
                            path: PRIMARY + 'annotation',
                        },
                        {
                            title: '泛型',
                            path: PRIMARY + 'genericity',
                        },
                        {
                            title: '反射',
                            path: PRIMARY + 'reflect',
                        },
                    ]
                },

                {
                    title: 'IO',
                    path: JAVAIO + '读写文件',
                    collapsable: false,
                    children: [
                        { title: '读写文件', path: JAVAIO + '读写文件' },
                        { title: '文件复制', path: JAVAIO + '文件复制' },
                        { title: '同步、异步、阻塞、非阻塞', path: JAVAIO + '同步、异步、阻塞、非阻塞' },
                        { title: '文件流中的装饰器模式', path: JAVAIO + '文件流中的装饰器模式' },
                    ]
                },
                {
                    title: '进阶',
                    path: ADVANCED + 'dynamic-proxy',
                    collapsable: false,
                    children: [
                        { title: '代理', path: ADVANCED + 'dynamic-proxy' },
                    ]
                },


            ],
            '/jvm/': [
                'ClassLoader',
                'Runtime-Area',
                'Object-Alloc-Layout-Access',
                'Memory-Overflow',
                'GC-Memory-Alloc',
                'Class-Init',
                'StackFrame',
                'About-Reference',
                'Handle-Promotion'
            ]
        },
        // sidebar: [
        //     {
        //         title: '数据类型',
        //         path: PRIMARY + 'primary-datatype',
        //         collapsable: false,
        //         children: [
        //             {title: '基本数据类型', path: PRIMARY + 'primary-datatype'},
        //             {title: '字符串', path: PRIMARY + 'string'},
        //             {title: '布尔值的问题', path: PRIMARY + 'bool'},
        //         ]
        //     },
        //     // {
        //     //     title: '枚举',
        //     //     path: JAVABASE + 'enum',
        //     // },
        //     // {
        //     //     title: '泛型',
        //     //     path: JAVABASE + 'genericity',
        //     // },
        //     // {
        //     //     title: '注解',
        //     //     path: JAVABASE + 'annotation',
        //     // },
        //     // {
        //     //     title: 'IO',
        //     //     path: javaio + '读写文件',
        //     //     collapsable: false,
        //     //     children: [
        //     //         {title: '读写文件', path: javaio + '读写文件'},
        //     //         {title: '文件复制', path: javaio + '文件复制'},
        //     //         {title: '同步、异步、阻塞、非阻塞', path: javaio + '同步、异步、阻塞、非阻塞'},
        //     //         {title: '文件流中的装饰器模式', path: javaio + '文件流中的装饰器模式'},
        //     //     ]
        //     // },
        //     // {
        //     //     title: '反射',
        //     //     path: JAVABASE + 'reflect',
        //     // },

        // ],
        subSidebar: 'auto',
        // lastUpdated: 'Last Updated'
    },
}