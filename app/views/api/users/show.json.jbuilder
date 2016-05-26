if @items.length == 0
  json.username @user.username
  json.user_id @user.id
  json.item_id nil
  json.created_at nil
  json.body nil
  json.item_rank nil
  json.finished_yet nil
  json.updated_at nil
else
  json.array! @items do |item|
    json.username item.user.username
    json.user_id item.user_id
    json.item_id item.id
    json.created_at item.created_at
    json.body item.item_body
    json.item_rank item.rank
    json.finished_yet item.finished
    json.updated_at item.updated_at.to_time.strftime('%B %e at %l:%M %p')
  end
end
