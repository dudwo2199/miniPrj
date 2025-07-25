const categoryTag = document.querySelector('#category');

onload = () => {
  const categorys = JSON.parse(sessionStorage.getItem('categorys'));

  let opt = '<option value=0 selected disabled>선택하세요</option>';
  categorys.forEach((vo) => {
    opt += `
  <option value=${vo.categoryNo}>${vo.categoryName}</option>
  `;
  });
  categoryTag.innerHTML = opt;
};

function onWrite() {
  const parentNo = sessionStorage.getItem('TargetNo');

  const titleTag = document.querySelector('input[type=text]');
  const contentTag = document.querySelector('textarea');

  if (Number(categoryTag.value) === 0) {
    alert('카테고리를 선택하셈');
    console.log(categoryTag);
    return;
  }

  if (titleTag.value === '') {
    alert('제목을 입력하셈');
    return;
  }
  if (contentTag.value === '') {
    alert('내용을 입력하셈');
    contentTag.focus();
    return;
  }
  const vo = {
    parentNo,
    title: titleTag.value,
    content: contentTag.value,
    categoryNo: categoryTag.value,
  };
  console.log(vo);

  const url = 'http://127.0.0.1/api/board';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vo),
  })
    .then((res) => {
      if (!res.ok) throw new Error('1글쓰기 실패');
      alert('글쓰기 성공');
      location.href = '/';
    })
    .catch((err) => {
      alert(err.message);
    });
}
