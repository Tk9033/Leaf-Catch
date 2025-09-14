require "test_helper"

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get games_path
    assert_response :success
  end

  test "should create game" do
    post games_path, params: { game: { name: "Test" } }
    assert_response :redirect
  end
end
