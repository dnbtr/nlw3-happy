import Images from '../models/Images';

export default {
  render(image: Images) {
    return {
      id: image.id,
      url: `http://localhost:8080/uploads/${image.path}`
    };
  },

  renderMany(image: Images[]) {
    return image.map(image => this.render(image));
  }
};