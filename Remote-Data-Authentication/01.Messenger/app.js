function attachEvents() {
  document.getElementById('refresh').addEventListener('click', getMessages);
  document.getElementById('submit').addEventListener('click', createMessage);
  const textArea = document.getElementById('messages');
  const authorInput = document.querySelector('[name="author"]');
  const contentInput = document.querySelector('[name="content"]');

  async function getMessages() {
    try {
      const res = await fetch('http://localhost:3030/jsonstore/messenger');
      const data = await res.json();

      textArea.textContent = '';
      for (let msg in data) {
        textArea.textContent += `${data[msg].author}: ${data[msg].content}\n`;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function createMessage() {
    const message = {
      author: authorInput.value,
      content: contentInput.value,
    };
    try {
      const url = 'http://localhost:3030/jsonstore/messenger';
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      };

      const res = await fetch(url, options);
      const data = await res.json();

      authorInput.value = '';
      contentInput.value = '';
      await getMessages();
    } catch (err) {
      console.error(err);
    }
  }
}

attachEvents();
