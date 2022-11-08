$(document).ready(async function () {
  await $("header").load("common/_header.html", addHeaderEvents);
  await $("footer").load("common/_footer.html");
  await $("#includes").load("common/_includes.html");
});

const addHeaderEvents = () => {
  $("header .nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      $("#navbarNav").collapse("hide");
      const hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        () => (window.location.hash = hash)
      );
    }
  });
};
