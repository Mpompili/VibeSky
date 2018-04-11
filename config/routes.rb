Rails.application.routes.draw do
 root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :edit, :show]
    resources :tracks do 
      resources :comments, only: [:create]
    end 
    resources :comments, only: [:update, :destroy]
    resource :session, only: [:create, :destroy]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
