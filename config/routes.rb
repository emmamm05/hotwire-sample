# frozen_string_literal: true

Rails.application.routes.draw do
  resources :messages, only: [:create, :index, :destroy]
  get :queries, to: "messages#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "messages#index"
end
