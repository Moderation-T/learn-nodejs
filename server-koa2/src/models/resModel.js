class BaseModel {
  // 默认返回 data 是个对象，就是请求成功后返回的数据；message 是 string 是一些提示信息
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }

    if (data) this.data = data;
    if (message) this.message = message;
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errorCode = 0;
  }
}

class FailModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errorCode = -1;
  }
}

module.exports = {
  SuccessModel,
  FailModel,
};
