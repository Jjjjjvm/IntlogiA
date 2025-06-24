// الحصول على عناصر الصفحة
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('apiSearchInput');
const resultsContainer = document.getElementById('resultsContainer');

// إضافة مستمع حدث للزر
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query === "") {
        alert("الرجاء إدخال كلمة للبحث");
        return;
    }

    // عرض رسالة "جاري البحث..."
    resultsContainer.innerHTML = '<p>جاري البحث...</p>';

    // استخدام Fetch API لجلب البيانات
    // سنبحث عن المقالات التي تحتوي على الكلمة المدخلة
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`)
        .then(response => {
            // التأكد من أن الرد سليم
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // تحويل الرد إلى JSON
        })
        .then(data => {
            displayResults(data); // استدعاء دالة عرض النتائج
        })
        .catch(error => {
            // التعامل مع الأخطاء
            resultsContainer.innerHTML = `<p>حدث خطأ: ${error.message}</p>`;
            console.error('There has been a problem with your fetch operation:', error);
        });
});

function displayResults(data) {
    // تفريغ الحاوية من النتائج السابقة
    resultsContainer.innerHTML = '';

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>لم يتم العثور على نتائج.</p>';
        return;
    }

    // المرور على البيانات وإنشاء عنصر HTML لكل نتيجة
    data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const titleElement = document.createElement('h3');
        titleElement.textContent = post.title;

        const bodyElement = document.createElement('p');
        bodyElement.textContent = post.body;

        postElement.appendChild(titleElement);
        postElement.appendChild(bodyElement);

        resultsContainer.appendChild(postElement);
    });
}
