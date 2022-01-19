module.exports = {
    plugins: {
        'postcss-preset-env': {
            state: 0,  //编译第零阶段
            features: { //使用什么样的特性
                'nesting-rules': true, //嵌套规则
            }
        }
    }
}