class CreateOffers < ActiveRecord::Migration[7.0]
  def change
    create_table :offers do |t|
      t.string :title
      t.string :description
      t.string :gender
      t.integer :min_age
      t.integer :max_age

      t.timestamps
    end
  end
end
