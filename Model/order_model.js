let order_Data = {
    id: csv_headers["order_id"],
    date_of_sale : csv_headers["date_of_sale"],
    region : csv_headers["region"],
    quantity: csv_headers["quantity"],
    payment: csv_headers["payment"]
}

module.exports = {order_Data}