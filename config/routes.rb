# frozen_string_literal: true

Rails.application.routes.draw do
  resources :posts
  get "home/index"
  get "other/index"

  get "/home/turbo_frame_form" => "home#turbo_frame_form", as: "turbo_frame_form"
  post "/home/turbo_frame_submit" => "home#turbo_frame_submit", as: "turbo_frame_submit"

  post "/other/post_something" => "other#post_something", as: "post_something"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "home#index"
end
