module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    // 主题配置
    themeConfig: {
        // 配置页面左上角的logo，/为.vuepress下的public文件夹
        logo: '/assets/img/logo.png',
        nav: [
            { 
                text: 'Java',
                ariaLabel: 'Java Menu',
                // 使用items而不是link可以变成一个下拉框
                // 以 / 结尾的路径将会被视为 */README.md
                items: [
                    {text: "基础", link: "/java/javase"},
                    {text: "并发", link: "/java/conc"},
                    {text: "JVM", link: "/java/jvm"},
                ]
            },
            { text: '框架', link: '/guide/' },
            { text: '算法', link: 'https://baidu.com', target: "_self" },
            { text: '网络', link: 'https://baidu.com' },
        ],
        sidebar: [
            '/',
            '/page-a',
            ['/page-b', 'Explicit link text']
        ]
    },
}