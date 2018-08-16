class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :name
      t.text :description
      t.integer :status
      t.integer :created_by

      t.timestamps
    end
  end
end
