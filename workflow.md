ProjetoBrasil.org: git workflow
===============================

Ferramenta de apoio utilizada para o seguir o workflow: [git-flow](https://github.com/nvie/gitflow).

Este guia não é exaustivo, e portanto não aborda todos os cenário encontrados durante o desenvolvimento do aplicativo.
Novas convenções serão incluídas durante a evolução do projeto e das boas práticas adotadas.

Configuração
------------

Instale o pacote adequado ao SO utilizado conforme descrito na [wiki do git-flow](https://github.com/nvie/gitflow/wiki/Installation).

Inicialize o git-flow no repositório (necessário em cada clone criado):

```bash
$ git flow init
```

Aceite as convenções adotadas pelo git-flow, conforme exemplificado a seguir:

```
No branches exist yet. Base branches must be created now.
Branch name for production releases: [master] 
Branch name for "next release" development: [develop] 

How to name your supporting branch prefixes?
Feature branches? [feature/] 
Release branches? [release/] 
Hotfix branches? [hotfix/] 
Support branches? [support/] 
Version tag prefix? [] 
```

Regras básicas
--------------

- Nenhum *commit* deve ser realizado diretamente no *master branch*;
- Novas funcionalidades devem ser desenvolvidas utilizando *feature branches*;
- Novas versões devem ser lançadas utilizando *release branches*;
- Correções de bugs devem ser feitas utilizando *hotfix branches*;

Convenções para nomenclatura de versões
---------------------------------------

As convenções adotadas para nomenclatura de versões seguem o [Semantic Versioning 2.0.0](http://semver.org/).

Um número de versão deve seguir o padrão MAJOR.MINOR.PATCH, onde um incremento no:
- MAJOR indica alterações na API que quebrem a compatibilidade com versões anteriores;
- MINOR indica novas funcionalidades mantendo compatibilidade com versões anteriores;
- PATCH indica correções de bugs sem alterar a compatibilidade com versões anteriores;
- 0.X.Y indica desenvolvimento inicial, onde a API é instável e pode mudar a qualquer momento;
- 1.0.0 marca a primeira versão pública da API.

As regras aqui descritas não abrangem todos os detalhes das convenções adotadas, consulte a [especificação](http://semver.org/) para mais detalhes.


Incluindo novas funcionalidades
-------------------------------

Novas funcionalidades devem ser sempre desenvolvidas utilizando *feature branches*.

Comece uma *feature* utilizando o comando:
```bash
git flow feature start <nome-da-feature>
```

Realize *commits* normalmente utilizando o comando (com os parâmetros necessários):
```bash
git commit
```

Ao terminar o desenvolvimento da funcionalidade utilize o comando:
```bash
git flow feature finish <nome-da-feature>
```

Atenção! Ao finalizer uma *feature* a *branch* é excluída localmente e, se for o caso, pode ser necessário excluí-la na origem:
```bash
git push origin --delete feature/<nome-da-feature>
```

*Feature branches* por padrão só existem no repositório local. Para compartilhar o trabalho com a equipe utilize o comando:
```bash
git flow feature publish <nome-da-feature>
```

Para utilizar uma *feature* compartilhada por outra pessoa utilize o comando:
```bash
git flow feature track <nome-da-feature>
```

Para trabalhar com diversas *features* ao mesmo tempo utilize o comando a seguir para alternar entre elas:
```bash
git flow feature checkout <nome-da-feature>
```

Lançando uma nova versão
------------------------

Para iniciar uma nova versão utilize o comando:
```bash
git flow release start <numero-da-versao>
```

Em seguida publique a versão utilizando o comando:
```bash
git flow release publish <numero-da-versao>
```

E para acompanhar uma versão publicada utilize o comando:
```bash
git flow release track <numero-da-versao>
```

Atenção! Não faça *commits* no *release branch* que envolvam novas funcionalidades. Somente faça commits se for realmente necessário para finalizar a versão.

Finalize a versão utilizando o comando:
```bash
git flow release finish <numero-da-versao>
```
E envie suas tags utilizando o comando:
```bash
git push --tags
```

Corrigindo um bug em uma versão finalizada
------------------------------------------

Atenção! A correção de bugs originados de funcionalidades existentes somente no *branch* de desenvolvimento não devem utilizar *hotfix branches*.

Para iniciar uma versão de correção de bugs utilize o comando:
```bash
git flow hotfix start <numero-da-versao>
```

Atenção! Siga a [convenção de nomenclatura para versões](http://semver.org/).

Realize *commits* para corrigir cada um dos bugs encontrados na versão.

Finalize a versão de correção de bugs utilizando o comando:
```bash
git flow hotfix finish <numero-da-versao>
```

Sugestão de git *alias*
-----------------------

Inclua as linhas a seguir no arquivo ```~/.gitconfig``` ou semelhante:
```
[alias]
	ffl = flow feature list
	ffs = flow feature start
	fff = flow feature finish
	ffc = flow feature checkout
	ffp = flow feature publish
	fft = flow feature track
	ffd = flow feature diff
	frl = flow release list
	frs = flow release start
	frf = flow release finish
	frp = flow release publish
	frt = flow release track
	fhl = flow hotfix list
	fhs = flow hotfix start
	fhf = flow hotfix finish
```

Referências
-----------

- [Github do git-flow](https://github.com/nvie/gitflow)
- [git-flow cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/)
- [Especificação do semver](http://semver.org/)
