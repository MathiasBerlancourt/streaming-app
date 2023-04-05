import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour afficher l'interface utilisateur d'erreur
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Effectuer des actions spécifiques pour résoudre l'erreur
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Afficher l'interface utilisateur d'erreur
      return <h1>Une erreur est survenue.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
