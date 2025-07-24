function onWrite() {
  const titleTag = document.querySelector('input[type=text');
  const contentTag = document.querySelector('textarea');

  if (titleTag.value === '') {
    alert('제목을 입력하셈');
    titleTag.foucs();
    return;
  }
  if (contentTag.value === '') {
    alert('내용을 입력하셈');
    contentTag.focus();
    return;
  }
  const vo = { title: titleTag.value, content: contentTag.value };
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
      history.back();
    })
    .catch((err) => {
      alert(err.message);
    });
}
