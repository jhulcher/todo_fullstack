if @user.items.length == 0
  json.username @user.username
else
  json.username @user.username

  json.array! @user.items do |item|
    json.username current_user.username
    json.user_id current_user.id
    json.item_id item.id
    json.body item.item_body
  end
end
