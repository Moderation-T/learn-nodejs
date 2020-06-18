- nodejs 连接数据库报错 原因是 mysql8.0 以上加密方式，Node 还不支持。
  报错[SELECT ERROR] - ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

  - 解决方法

```
mysql> alter user 'root'@'localhost' identified with mysql_native_password by 'root123456';
Query OK, 0 rows affected (0.27 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.08 sec)
```
