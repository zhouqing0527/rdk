## 名词
- 应用：根据上下文，可以有下面两种解释
    - 使用组件的开发者
    - 使用组件开发出来的应用页面
- 用户：应用产品的用户

## 组件
### 使用方式
一个组件的使用方式主要分为两个方向：

#### 组件 ==> 应用

这个方向主要是用户和组件交互之后，由组件主动通知应用的过程。这个过程一般都需要携带一些数据，数据结构一般由组件实现自行定义，应用来适配。

建议这个过程仅通过这两种方式实现：

- 事件，由组件对外广播事件。
- 回调函数，组件提供方法允许应用传递回调函数到组件内部，回调函数由组件适时调用。

组件实现时，可同时支持这两种方式，也可仅支持其中的某一种。注意一旦挑选了某一种方式后，则所有组件都采用相同的方式，而不要组件A采用一种方式，组件B采用另一种方式。

> 我们建议组件同时支持这两种方式。
>
> 并且我们认为事件方式是一种重要的方式，建议务必支持。

#### 应用 ==> 组件

这个方向主要是应用主动操作组件的过程，

- 比如应用需要设置组件的某个值
- 比如应用需要读取组件的某个值

通常有下面的实现方式

- 方法调用，组件暴露出特定方法，允许应用直接调用这些方法来获取组件内部数据，或者更改组件内部数据。
- 事件，组件监听特定类型的事件，由应用发出事件给组件。

类似的，应用一旦挑选了某种方式实现，则建议保持所有组件都采用此方式来实现。

> 我们建议组件只支持方法调用的方式。
>
> 事件方式是一个异步的过程，这个方式会增加应用的实现难度，让应用的代码难以维护。相反的，方法调用是一个同步的过程，应用可以在一个调用堆栈中完成它的下一步。

#### 数据绑定

多数MV*框架都提供数据绑定功能，有的（比如Angular）甚至还支持双向数据绑定功能。所谓的双向，指的就是前文的 “应用 ==> 组件” 和 “组件 ==> 应用” 这两个方向。

所以，数据绑定功能实际上应用使用组件的另一种方式，由于它比较特殊，单独对其讨论。

> 我们认为 数据绑定应该作为使用组件的一个不可或缺的辅助手段，不能成为主要手段，更不能是唯一手段。

先讨论数据绑定不能是使用组件的主要手段的原因。

“绑定”就意味着应用要有一笔数据和组件内部的另一笔数据一一对应，这实际上就破坏了组件对数据的封装性。通常一个组件会有十几个甚至几十个属性，应用需要操作其中的任意一个属性，都必须定义一个变量与之对应，这会让应用内部平白无故对出许多没必要的变量要维护。特别是同一个组件在应用中有多个实例，那么不同实例组件的同一个属性在应用内部如何维护，就成了一个问题。

但是，为何又说数据绑定是使用组件的一个**不可或缺的辅助手段**呢？

。。。

### 组件的样式

#### 内部样式class的命名规范
#### 应用如何覆盖组件内部样式
#### 组件多皮肤

## 第三方库管理
### 解决依赖关系
### 应用新增或者覆盖第三方库