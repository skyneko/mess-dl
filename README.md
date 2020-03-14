## Sử Dụng

0. clone project:
```
git clone https://github.com/skyneko/mess-dl.git
cd mess-dl && npm install
```

1. Mở [facebook](http://facebook.com) và đăng nhập tài khoản.

2. Bật developer tool sử dụng phím F12, Ctrl + Shift + I hoặc chuột phải chọn Inspect Element.

![alt text](https://raw.githubusercontent.com/skyneko/mess-dl/master/docs/1.png)

3. Chuyển sang tab Network ấn vào thanh tìm kiếm gõ "bz". Nếu không tìm thấy thì ấn reload lại trang.
![alt text](https://raw.githubusercontent.com/skyneko/mess-dl/master/docs/2.png)
4. Chuột phải chọn vào row vừa hiển thị Copy -> Copy Request Headers.
![alt text](https://raw.githubusercontent.com/skyneko/mess-dl/master/docs/5.png)
5. Paste dữ liệu vừa copy vào file requestHeaders.txt.
![alt text](https://raw.githubusercontent.com/skyneko/mess-dl/master/docs/3.png)
6. Vào file script.js thêm groupID và tinh tỉnh theo ý của bạn.

7. Mở terminal/command prompt gõ lệnh: 
``` 
node script
```
![alt text](https://raw.githubusercontent.com/skyneko/mess-dl/master/docs/4.png)
