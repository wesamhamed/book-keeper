const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

function showModal() {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}

function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!urlValue || !nameValue) {
        alert("Please submit values for both fields");
        return false;
    }
    if (!urlValue.match(regex)) {
        alert("Please provide a vaild web address");
        return false;
    }
    return true;
}

function fetchBookmarks() {
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    } else {
        bookmarks = [{
            name: "loredffd",
            url: "http://ddfdf"
        }];
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    })
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
    buildBookmarks();
}

function buildBookmarks() {
    bookmarksContainer.textContent = "";
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;

        const item = document.createElement("div");
        item.classList.add("item");

        const closeIcon = document.createElement("i");
        closeIcon.classList.add("fas", "fa-times");
        closeIcon.setAttribute("title", "Delete bookmark");
        closeIcon.setAttribute("onClick", `deleteBookmark('${url}')`);
        const linkInfo = document.createElement("div");
        linkInfo.classList.add("name");
        const favicon = document.createElement("img");
        favicon.setAttribute("src", `favicon.png`);
        favicon.setAttribute("alt", "favicon");

        const link = document.createElement("a");
        link.setAttribute("href", `${url}`);
        link.setAttribute("target", "_blank");
        link.textContent = name;

        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    })
}

function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes("http://", "https://")) {
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue
    }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => modalShow.classList.remove("show-modal"));
window.addEventListener("click", e => (e.target === modal ? modal.classList.remove("show-modal") : false));
bookmarkForm.addEventListener("submit", storeBookmark);

fetchBookmarks();