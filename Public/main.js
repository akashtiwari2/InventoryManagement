function deleteProduct(id)
{console.log(id)
  const choice = confirm("Are you sure fir add bi krna adega soochlo");
  if (choice) {
    fetch("/delete_product/"+id, { method: "POST" }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  }
}
