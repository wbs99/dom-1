# DOM 封装
## 使用方法
## 增
1. dom.create()              创建节点
2. dom.after(node, node2)    新增弟弟
3. dom.before(node, node2)   新增哥哥
4. dom.append(parent, child) 新增儿子
5. dom.wrap(node, parent)    新增爸爸
## 删
1. dom.remove(node) 删除节点
2. dom.empty(node)  删除后代
## 改
1. dom.attr(node, 'title', value) 写属性
2. dom.attr(node, 'title') 读属性
3. dom.text(node, string) 写文本内容
4. dom.text(node) 读文本内容
5. dom.html(node，string) 写 HTML 内容
6. dom.html(node) 读 HTML 内容
7. dom.style(node,{color:'red'})  修改 style 
8. dom.class.add(node,'blue') 添加 class
9. dom.class.remove(node,'blue')  删除 class
10. dom.on(node.'eventName',fn)  添加时间监听
11. dom.off(node.'eventName',fn) 删除事件监听
## 查
1. dom.find('选择器') 获取标签或者标签们
2. dom.parent(node) 获取父元素
3. dom.children(node) 获取子元素
4. dom.siblings(node) 获取兄弟姐妹元素
5. dom.next(node) 获取弟弟
6. dom.previous(node) 获取哥哥
7. dom.each(node,fn)  遍历所有节点
8. dom.index(node)  获取排行老几
