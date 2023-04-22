module.exports = {
    title: 'Xing Blogs',
    description: 'Record My Knowledge',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/logo.png' }]
    ],
    // 主题配置
    themeConfig: {
        // 配置页面左上角的logo，/为.vuepress下的public文件夹
        logo: '/assets/img/logo.png',
        nav: [
            { 
                text: 'Java',
                ariaLabel: 'Java Menu',
                // link: "/java/javase/"
                // 使用items而不是link可以变成一个下拉框
                // 以 / 结尾的路径将会被视为 */README.md
                items: [
                    {text: "基础", link: "/java/"},
                    {text: "JVM", link: "/jvm/"},
                ]
            },
            { text: '框架', link: '/frame/' },
            { text: '算法', link: 'https://baidu.com', target: "_self" },
            { text: '网络', link: 'https://baidu.com' },
        ],
        sidebar: {
            '/java/': [
                'String',
                'IO',
                'Annotation',
                'Enum',
                'Genericity',
                'Reflect',
                'Dynamic-Proxy'
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
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    },
}