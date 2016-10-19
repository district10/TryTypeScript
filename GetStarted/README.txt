在 VSC 里按 C-S-B 来 build，如果没有 .vscode/tasks.json 文件，
会提示你，然后选择生成 typescript 工程，就有这个文件了。

在 compilerOptions 里设置 outDir。
这样就不会污染源文件夹了。
