- nginx 介绍

  > 高性能的 web 服务器，开源免费
  > 一般用于做静态服务，负载均衡
  > 反向代理

- nginx 配置

  > 配置文件：/usr/local/etc/nginx/nginx.conf
  > 一些命令：
  > nginx -t 测试配置文件格式是否正确
  > nginx 启动
  > nginx -s reload 重启
  > nginx -s stop 停止

- 修改 nginx.conf 保存时报错

```
worker_processes  2;

    server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

#        location / {
#           root   html;
#           index  index.html index.htm;
#      }\

location / {
proxy_pass http://localhost:8000;
}

location /api/ {
proxy_pass http://localhost:3000;
proxy_set_header Host $host;
}
```

> vim 保存时报错：E382: Cannot write, 'buftype' option is set
> 解决方法：
> 可用下面的命名查看 buftype 的设置，当 buftype=nofile 时，不能保存文件，只有当 buftype=空时，才可以保存
> `:verbose set buftype`
> 修改 buftype 的方法：vim 切换至 ex 模式，输入
> `:setlocal buftype=`
> 如果想该回原设置，可用下面的命令：
> `:setlocal buftype=nofile`
