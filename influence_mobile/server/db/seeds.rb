# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'

age_range = (1..90)

1000.times.each do |i|
	ages = [rand(age_range), rand(age_range)]
	Offer.create(title: Faker::Commerce.product_name, description: Faker::Lorem.paragraph, min_age: ages.min, max_age: ages.max, gender: ['Male', 'Female'].sample)
end
