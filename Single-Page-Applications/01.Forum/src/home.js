//detatchment

const container = document.querySelector('.container');
const section = document.querySelector('main');
section.remove();

export function showHome() {
    container.replaceChildren(section);
}