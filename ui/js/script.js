$(".jsInfoBtn").click(function () {
  $(".info")
    .css("min-height", "auto")
    .slideUp(200, function () {
      $(".info").css("min-height", "");
    });
});

//================searchbox==================

const submitIcon = $(".searchbox__icon");
const inputBox = $(".searchbox__input");
const searchBox = $(".searchbox");
let isOpen = false;

submitIcon.click(function () {
  if (isOpen == false) {
    searchBox.addClass("searchbox__open");
    inputBox.focus();
    isOpen = true;
  } else {
    searchBox.removeClass("searchbox__open");
    inputBox.focusout();
    inputBox.val("");
    isOpen = false;
  }
});

submitIcon.mouseup(function () {
  return false;
});

searchBox.mouseup(function () {
  return false;
});

$(document).mouseup(function () {
  if (isOpen == true) {
    submitIcon.css("display", "flex").click();
  }
});

function buttonUp() {
  let inputVal = $(".searchbox__input").val();
  inputVal = $.trim(inputVal).length;
  if (inputVal !== 0) {
    $(".searchbox__icon").css("display", "none");
  } else {
    $(".searchbox__input").val("");
    $(".searchbox__icon").css("display", "flex");
  }
}

//==================================

// documentation https://github.com/SortableJS/sortablejs

const jsEditorSlideList = $(".jsEditorSlideList");
const jsSubmit = $(".jsSubmit");
const jsEditorDelete = $(".jsEditorDelete");

function addDisabled() {
  jsEditorSlideList.addClass("editor__slide-list_empty");
  jsSubmit.addClass("disabled");
  jsEditorDelete.addClass("disabled");
}

function updateSum() {
  const sum = $(".slide_selected").length;
  $(".jsEditorCounterSum").text(sum);
  return sum;
}

new Sortable(document.querySelector(".jsEditorSelection"), {
  group: {
    name: "shared",
    pull: "clone",
    put: false,
  },
  filter: ".slide_disabled",
  animation: 150,
  sort: false,
});

new Sortable(document.querySelector(".editor__slide-list"), {
  group: "shared",
  animation: 150,
  removeCloneOnHide: true,

  onAdd: function (evt) {
    const currentItem = $(evt.item);
    const currentItemId = currentItem.data("id");

    currentItem.addClass("slide_selected");

    $(".jsEditorSelection .slide[data-id=" + currentItemId + "]").addClass(
      "slide_disabled"
    );

    jsEditorSlideList.removeClass("editor__slide-list_empty");
    jsSubmit.removeClass("disabled");
    jsEditorDelete.removeClass("disabled");

    updateSum();
  },
});

jsEditorDelete.click(function () {
  addDisabled();
  jsEditorSlideList.html("");
  $(".slide").removeClass("slide_disabled");
  updateSum();
});

$(".jsSlideDelete").click(function () {
  const parent = $(this).parent(".slide");
  const parentId = parent.data("id");

  $(".jsEditorSelection .slide[data-id=" + parentId + "]").removeClass(
    "slide_disabled"
  );
  parent.remove();
  const sum = updateSum();

  if (sum === 0) {
    addDisabled();
  }
});
