if @items.length == 0
  json.username current_user.username
  json.user_id current_user.id
  json.item_id nil
  json.body nil
else
  json.array! @items do |item|
    json.username current_user.username
    json.user_id item.user_id
    json.item_id item.id
    json.body item.item_body
  end
end
