📷 React Picsum Photo Gallery
Đây là một dự án React được xây dựng để hiển thị một thư viện ảnh sử dụng Lorem Picsum API. Ứng dụng cho phép người dùng xem một lưới ảnh, tự động tải thêm ảnh khi cuộn (infinite scroll), và xem thông tin chi tiết của từng ảnh.





✨ Tính năng chính

Hiển thị Lưới ảnh: Hiển thị danh sách ảnh dưới dạng lưới (grid) responsive, bao gồm ảnh thumbnail và tên tác giả.


Tải vô hạn (Infinite Scroll): Tự động tải và hiển thị thêm ảnh khi người dùng cuộn xuống cuối trang.


Chỉ báo (Indicators): Hiển thị chỉ báo loading khi đang tải ảnh mới và thông báo khi đã tải hết ảnh.



Routing: Sử dụng React Router để điều hướng giữa trang danh sách và trang chi tiết.


Xem chi tiết: Cho phép người dùng nhấp vào một ảnh để điều hướng đến trang chi tiết (/photos/:id).



Trang chi tiết: Hiển thị ảnh kích thước đầy đủ, tên tác giả, tiêu đề và mô tả (nếu có).


Xử lý Lỗi/Loading: Quản lý các trạng thái loading và lỗi trong quá trình gọi API.


Responsive: Giao diện được thiết kế để hoạt động tốt trên cả máy tính và thiết bị di động.

🛠️ Công nghệ sử dụng
React


React Router Dom: Dùng cho việc điều hướng và định tuyến trang.

Axios (hoặc Fetch API): Để thực hiện các yêu cầu HTTP đến API của Picsum.


CSS Framework:  (Tùy chọn: Tailwind CSS, Material UI, hoặc Bootstrap).

(Khuyến nghị) React Intersection Observer: Một thư viện/hook hữu ích để triển khai infinite scroll một cách hiệu quả.

📂 Cấu trúc thư mục dự án
Một cấu trúc thư mục được tổ chức tốt là rất quan trọng để quản lý code. Dưới đây là một cấu trúc gợi ý:

Bash

/src
|
|-- /api
|   |-- picsumApi.js       # (Chứa logic gọi API, vd: hàm fetchPhotos, fetchPhotoDetails)
|
|-- /components
|   |-- /common            # (Các component chung: Loader, ErrorMessage, Button...)
|   |   |-- Loader.js
|   |   |-- ErrorMessage.js
|   |-- /photos
|   |   |-- PhotoGrid.js   # (Component chứa lưới ảnh)
|   |   |-- PhotoItem.js   # (Component cho mỗi ảnh trong lưới)
|
|-- /hooks
|   |-- useInfiniteScroll.js # ((Tùy chọn) Custom hook cho logic infinite scroll)
|   |-- usePhotos.js         # (Custom hook để fetch và quản lý state ảnh)
|
|-- /pages
|   |-- HomePage.js          # (Trang chủ, hiển thị PhotoGrid)
|   |-- PhotoDetailPage.js   # (Trang chi tiết ảnh)
|   |-- NotFoundPage.js      # (Trang 404)
|
|-- App.js                 # (Cấu hình React Router chính)
|-- index.js
|-- index.css              # (Styles global)

⚙️ Luồng hoạt động (How it Works)
1. Điều hướng (Routing)
File App.js sẽ định nghĩa các tuyến đường (routes) chính bằng React Router.


/ hoặc /photos: Render component HomePage.


/photos/:id: Render component PhotoDetailPage.

2. Trang chủ và Infinite Scroll (HomePage.js)
Quản lý State: Trang này sử dụng useState (hoặc useReducer) để lưu trữ danh sách ảnh (photos), trang hiện tại (page), trạng thái tải (isLoading), và trạng thái còn ảnh để tải (hasMore).

Fetch dữ liệu: Sử dụng useEffect để gọi API fetch ảnh cho trang đầu tiên khi component được mount.


Triển khai Infinite Scroll:

Cách tốt nhất là sử dụng IntersectionObserver API.

Tạo một component "trigger" (thường là một <div> trống) ở dưới cùng của PhotoGrid.

Sử dụng một custom hook (ví dụ: useInfiniteScroll) hoặc thư viện react-intersection-observer để theo dõi khi component "trigger" này xuất hiện trên màn hình.

Khi nó xuất hiện và isLoading là false và hasMore là true, gọi hàm để fetch trang tiếp theo.

Hàm fetch sẽ tăng số page, gọi API, và nối kết quả mới vào mảng photos hiện có.

Nếu API trả về một mảng rỗng, set hasMore thành false để ngừng các lệnh gọi tiếp theo.


Hiển thị: Render PhotoGrid (truyền photos làm prop) và Loader (nếu isLoading là true).

3. Trang chi tiết (PhotoDetailPage.js)

Lấy ID: Sử dụng hook useParams của React Router để lấy id từ URL.

Fetch dữ liệu: Sử dụng useEffect để gọi API lấy thông tin chi tiết của ảnh (ví dụ: https://picsum.photos/id/{id}/info) ngay khi component được mount hoặc khi id thay đổi.


Hiển thị: Hiển thị ảnh kích thước đầy đủ (dùng download_url từ API), tên tác giả, và các thông tin khác.

4. Logic API (api/picsumApi.js)
Tạo các hàm bất đồng bộ (async) để xử lý việc gọi API.


fetchPhotos(page): Gọi https://picsum.photos/v2/list?page=${page}&limit=20 để lấy danh sách ảnh theo trang.

fetchPhotoDetails(id): Gọi https://picsum.photos/id/${id}/info để lấy chi tiết một ảnh.

Các hàm này nên xử lý try/catch để quản lý lỗi.

🚀 Cài đặt và Chạy dự án
Clone repository:

Bash

git clone <your-repo-url>
cd <project-directory>
Cài đặt dependencies:

Bash

npm install
Chạy ứng dụng (development):

Bash

npm start
Mở http://localhost:3000 để xem trong trình duyệt.