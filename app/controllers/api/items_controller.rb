class Api::ItemsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  def create
    @item = Item.new(item_params)
    @item.user_id = current_user.id

    if current_user.items.count > 0
      @item.rank = Item.where("user_id = #{current_user.id}").maximum("rank") + 1
    else
      @item.rank = 1
    end

    @item.save!
    # return new set of items
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  def update
    # If update involves Re-Ranking
    if params[:item][:rank].is_a?(Array)
      @items = []
      # Query database for User's highest item rank, only one time
      current_rank = Item.where("user_id = #{current_user.id}").maximum("rank")

      params[:item][:rank].each do |item_id|
        @item = Item.find_by_id(item_id)
        # Make sure Item actually belongs to current_user
        if current_user.id == @item.user_id
          @item.rank = (current_rank += 1)
          @item.save!
          @items.push(@item)
        end
      end
      #return new set of items
      @items
      # If Update involves marking Item as complete or incomplete
    else
      @item = Item.find(params[:id])
      # Make sure items belong to current_user before updating
      if params[:item][:finished] && @item.user_id == current_user.id
        @item.finished = params[:item][:finished]

        if @item.finished
          @item.save!
          #return new set of items
          @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
        else
          # If Item is marked un-finished, it's re-ranked as the lowest priority
          @item.rank = Item.where("user_id = #{current_user.id}").maximum("rank") + 1
          @item.save!
          #return new set of items
          items = current_user.items.where(finished: true)
          @items = items.sort_by { |x| x.updated_at }.reverse
        end
      end
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy!
    # return unfinished Items, now minus the recently deleted Item
    @items = current_user.items.where(finished: false).sort_by { |x| x.rank }
  end

  private
  def item_params
    params.require(:item).permit(:item_body, :rank, :finished)
  end
end
