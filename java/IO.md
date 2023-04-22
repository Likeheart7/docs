# IO
> [https://hollischuang.gitee.io/tobetopjavaer/#/basics/java-basic/byte-stream-vs-character-stream](https://hollischuang.gitee.io/tobetopjavaer/#/basics/java-basic/byte-stream-vs-character-stream)

### 同步、异步 | 阻塞、非阻塞

- 同步，异步，是描述被调用方的。
- [阻塞、非阻塞](https://hollischuang.gitee.io/tobetopjavaer/#/basics/java-basic/block-vs-non-blocking)，是描述调用方的。

同步不一定阻塞，异步也不一定非阻塞。没有必然关系。
举个栗子：

1. 老张把水壶放到火上，一直在水壶旁等着水开。（同步阻塞） 
2. 老张把水壶放到火上，去客厅看电视，时不时去厨房看看水开没有。（同步非阻塞） 
3. 老张把响水壶放到火上，一直在水壶旁等着水开。（异步阻塞） 
4. 老张把响水壶放到火上，去客厅看电视，水壶响之前不再去看它了，响了再去拿壶。（异步非阻塞）