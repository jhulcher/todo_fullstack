class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :user_id, null: false
      t.string :item_body, null: false
      t.timestamps null: false
    end
    add_index :items, :user_id
  end
end
