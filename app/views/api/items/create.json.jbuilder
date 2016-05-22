json.array! @items do |item|
  json.username item.user.username
  json.user_id item.user_id
  json.item_id item.id
  json.body item.item_body
end
