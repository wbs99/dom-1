window.dom = {
    create(string) {
        const container = document.createElement('template');//template 是专门用来容纳所有元素的，不会显示到页面
        container.innerHTML = string.trim();//trim()可以去掉字符串两边的空格
        return container.content.firstChild;//用 template 元素不能通过 children 拿到
    },
    /*增加弟弟，在 node 节点后面增加一个节点 node2，
    没有 insertAfter，只有 insertBefore*/
    after(node, node2) {
        //找到这个节点的爸爸，调用爸爸的 insertBefore ,把 node2 插到 node 的下一个节点的前面
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    //增加哥哥
    before(node, node2) {
        node.parentNode.insertBefore(node2, node); //node 支持的接口
    },
    //增加儿子
    append(parent, node) {
        parent.appendChild(node)
    },
    //增加爸爸，在一个节点的外面爸爸
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    remove(node) {
        //找到节点的爸爸删掉爸爸的儿子
        node.parentNode.removeChild(node)
        return node //返回移出的对象，如 let div = dom.remove(div) 能拿到被移除的节点。还能保留节点的引用
    },
     //删除所有后代
    empty(node) {
        const { childNodes } = node; // const childNodes = node.childNodes。从 node 获取到它的 childNodes
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild)) //当 x 存在就把它移除并放到数组里
            x = node.firstChild  //然后把 x 指向 firstChild,上面已经移除了第一个节点，这里 firstChild 相当于第二个节点
        }
        return array
    },
    // dom.attr(node, 'title',?)用于读写属性。
    attr(node, name, value) {     // 重载(根据参数个数写不同代码)
        //arguments.length 参数的长度
        if (arguments.length === 3) {            //如果参数长度为 3，就设置它的属性名和值，写操作
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {     //如果参数长度为2，就相当于读，就返回。读操作
            return node.getAttribute(name)
        }
    },
    //dom.text(node,?)用于读写文本内容
    text(node, string) { // 适配 
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string      //IE
            } else {
                node.textContent = string    //Chrome
            }
        } else if (arguments.length === 1) {  //获取文本内容
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    //dom.html(node,?)用于读写 HTML 内容
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(div, {color: 'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key] //不能用.key（这会变成一个字符串）。变量做 key 的话要用[]
                }
            }
        }
    },
    //dom.class.add(node, 'blue') 用于添加 class
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    //dom.on(node, 'click', fn)用于添加事件监听
    on(node, eventName, fn) { //告诉节点，事件名，事件处理函数
        node.addEventListener(eventName, fn)
    },
    //移除这个监听
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        //如果有范围 scope，则在 scope 里调用 querySelector,如果没有 scope 则在 document 里调用
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) { //如果是文本，是就下一个，如果下一个节点不是就返回
            x = x.nextSibling
        }
        return x
    },
     previous(node){
    let x = node.previousSibling
    while(x && x.nodeType === 3){    //如果是文本，是再往前，如果不是就返回
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn){
    for(let i=0;i<nodeList.length;i++){
      fn.call(null, nodeList[i])
    }
  },
    //dom.index(node)用于获取一个元素排行老几。
  index(node){
    const list = dom.children(node.parentNode)
    let i
    for(i=0;i<list.length;i++){
      if(list[i] === node){
        break
      }
    }
    return i
  }
};