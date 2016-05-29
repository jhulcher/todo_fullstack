if @items.length == 0
  json.username current_user.username
  json.user_id current_user.id
  json.amount_complete current_user.items.where({finished: true}).count
  json.amount_incomplete current_user.items.where({finished: false}).count
  json.item_id nil
  json.body nil
  json.item_rank nil
  json.finished_yet nil
else
  json.array! @items do |item|
    json.username current_user.username
    json.user_id item.user_id
    json.item_id item.id
    json.body item.item_body
    json.item_rank item.rank
    json.finished_yet item.finished
  end
end
