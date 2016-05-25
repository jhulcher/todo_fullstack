class Api::ItemsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  def create
    @item = Item.new(item_params)
    @item.user_id = current_user.id

    if current_user.items.count > 0
      @item.rank = Item.all.sort_by {|x| x.rank}[-1].rank + 1
    else
      @item.rank = 1
    end

    @item.save!
    # return new set of items
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  def update
    @item = Item.find(params[:id])
    @item.rank = Item.all.sort_by { |x| x.rank }.last.rank + 1

    if params[:item][:rank].is_a?(Array)
      params[:item][:rank].each do |x|
        @item = Item.find_by_id(x)
        @item.rank = Item.all.sort_by { |x| x.rank }.last.rank + 1
        @item.save!
      end
      @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
    end

    if params[:item][:finished]
      @item.finished = params[:item][:finished]
      if @item.finished
        @item.save!
        #return new set of items
        @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
      else
        @item.save!
        #return new set of items
        @items = current_user.items.where(finished: true)
        @items = @items.sort_by { |x| x.updated_at }.reverse
      end
    end

  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy!
    # return new set of items
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  private
  def item_params
    params.require(:item).permit(:item_body, :rank, :finished)
  end
end
