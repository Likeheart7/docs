@echo off
:: 切换到生成的地址
cd .\.vuepress\dist

:: 初始化git
echo "git init"
git init
:: 全部加入暂存
echo "git add"
git add -A
:: 提交
echo "git commit"
git commit -m "deploy"
echo "git push"
:: 推送到deploy分支
git push -f https://github.com/Likeheart7/docs.git master:deploy
