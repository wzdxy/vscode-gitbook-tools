# gitbook-tools

## 生成目录

```flow
st=>start:Start
e=>end
st->e
```

搜索所有*.md文件, 获得`绝对路径`,`相对路径`,`各级路径`,`文件名`,`标题`
```js
{
    fullPath:'c:/..',
    relativePath:'../',
    pathLevels:['',''],
    fileName:'xx',
    title:'xxx',
}
```

遍历数据, 生成树形结构
```js
{
    'f1':{
        title:'F1',
        path:'/',
        children:{
            'ff1':{
                title:'FF1',
                path:'f1/FF1',
            }
        }
    },
    'f2':{
        title:'F2',
        path:'',
        children:{
            'ff1':{
                title:'FF1',
                path:'f2/FF1',
            },
            'ff2':{
                title:'FF2',
                path:'f2/FF2',
                children:{
                    'fff2':{
                        title:'FFF2',
                        path:'f2/FF2/FFF2',
                    }
                }
            }
        }
    }
}
```


```js
[
    {
        title:'xxx',
        fileName:'',
        path:'',
        children:[
            {
                title:''
            }
        ]
    },
]
```